

# Pulls the image
resource "docker_image" "hppa_quiz_image" {
  name = var.image_name
}

# Create a container
resource "docker_container" "hppa_quiz_container" {
  image = docker_image.hppa_quiz_image.image_id
  name  = var.container_name
  ports {
    internal = 1918
    external = 8080
  }
}