from google import genai
from google.genai import types
from PIL import Image
import io

# Initialize the client for Vertex AI
client = genai.Client(
    vertexai=True, 
    project='constant-blend-499705-e1', 
    location='us-central1'
)

# Generate the image
response = client.models.generate_images(
    model='imagen-3.0-generate-001',
    prompt='A futuristic city with floating gardens and neon lights, high resolution, digital art style',
    config=types.GenerateImagesConfig(
        number_of_images=1,
    )
)

# Show or save the generated image
for i, generated_image in enumerate(response.generated_images):
    image = Image.open(io.BytesIO(generated_image.image.image_bytes))
    image.show()
    image.save(f"generated_image_{i}.png")

print("Image generated successfully!")
