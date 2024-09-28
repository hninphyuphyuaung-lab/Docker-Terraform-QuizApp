terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}

provider "docker" {
  registry_auth {
    address  = "index.docker.io/v1/"
    username = var.docker_username
    password = var.docker_password
  }
}