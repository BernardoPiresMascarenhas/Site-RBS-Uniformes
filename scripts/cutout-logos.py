"""Remove o fundo chapado das logos preservando os brancos/pretos internos.

Estratégia: flood fill a partir das bordas (só a região de fundo conectada é
afetada, então janelas brancas de prédio e contornos pretos internos ficam
intactos), com alpha proporcional à distância da cor de fundo para manter o
anti-aliasing, e "des-mistura" da cor nos pixels semi-transparentes.
"""

import numpy as np
from PIL import Image
from scipy.ndimage import binary_dilation, label

def cutout(src, dst, bg, t_low, t_high):
    im = Image.open(src).convert("RGB")
    a = np.asarray(im).astype(np.float32)
    bg = np.array(bg, dtype=np.float32)

    dist = np.linalg.norm(a - bg, axis=2)

    # Candidatos a fundo (tolerância generosa) e componentes conectados.
    cand = dist < t_high
    lab, n = label(cand)

    # Só as componentes que tocam a borda da imagem são fundo de verdade.
    border = np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]])
    bg_ids = set(np.unique(border)) - {0}
    region = np.isin(lab, list(bg_ids))

    # Alpha suave dentro da região de fundo (preserva o serrilhado da borda).
    alpha = np.ones(dist.shape, dtype=np.float32)
    soft = np.clip((dist - t_low) / max(t_high - t_low, 1e-6), 0.0, 1.0)
    alpha[region] = soft[region]

    # Des-mistura: pixel = k*C + (1-k)*bg  ->  C = (pixel - (1-k)*bg) / k
    k = alpha[..., None]
    mix = region & (alpha > 0.08) & (alpha < 1.0)
    rgb = a.copy()
    rgb[mix] = np.clip((a[mix] - (1 - k[mix]) * bg) / k[mix], 0, 255)

    out = np.dstack([rgb, alpha * 255]).astype(np.uint8)

    # Recorta o excesso de área transparente para a logo ocupar todo o quadro.
    ys, xs = np.where(alpha > 0.06)
    pad = 4
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + 1 + pad, out.shape[0])
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + 1 + pad, out.shape[1])
    out = out[y0:y1, x0:x1]

    Image.fromarray(out, "RGBA").save(dst)
    print(f"{dst}: {out.shape[1]}x{out.shape[0]}  "
          f"transparente={100 * (out[..., 3] < 8).mean():.1f}%")

    # sanity check: quanto do miolo continua opaco
    core = out[..., 3]
    print("   opaco:", f"{100 * (core > 247).mean():.1f}%")


cutout("public/logo-premium.png",
       "public/logo-premium-transparente.png",
       bg=(0, 0, 0), t_low=14, t_high=52)

cutout("public/logo-corporativa.jpeg",
       "public/logo-corporativa-transparente.png",
       bg=(253, 253, 253), t_low=12, t_high=46)
