from PIL import Image

img = Image.open("input.png")

img.save(
    "output.ico",
    format="ICO",
    sizes=[
        (256, 256),
        (128, 128),
        (64, 64),
        (48, 48),
        (32, 32),
        (16, 16),
    ]
)