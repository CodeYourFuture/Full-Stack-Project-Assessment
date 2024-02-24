terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.6.0"
    }
  }
  required_version = ">= 1.0.0"
}

provider "aws" {
  region = var.aws_region
}

resource "aws_security_group" "video_web_sg" {
  name        = "video_web_sg"
  description = "security group for video web servers"

  ingress {
    description = "allow all traffic through HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["192.168.1.108/32"]
  }

  ingress {
    description = "allow SSH from my computer"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${var.my_ip}/32"]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "video_web_sg"
  }
}


resource "aws_instance" "video_web" {
  ami           = "ami-0e5f882be1900e43b"
  instance_type = var.settings.web-app.instance_type
  key_name      = "video-pair-new"
  tags = {
    Name = "video_web_new"
  }
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/*ubuntu*-20.04-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"]
}

resource "aws_db_instance" "video_database" {
  allocated_storage   = var.settings.database.allocated_storage
  engine              = var.settings.database.engine
  engine_version      = var.settings.database.engine_version
  instance_class      = var.settings.database.instance_class
  name                = var.settings.database.db_name
  username            = var.db_username
  password            = var.db_password
  publicly_accessible = false
  tags = {
    Name = "video_db_new"
  }
}
