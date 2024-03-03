terraform {
  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "~> 5.0"
    }
  }
}

provider "aws" {
  region     = "eu-west-2"
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
}

resource "aws_db_instance" "videosRds" {
  identifier             = "videos-rds"
  allocated_storage      = 20
  storage_type           = "gp2"
  engine                 = "postgres"
  engine_version         = "16.1"
  instance_class         = "db.t3.micro"
  publicly_accessible    = true
  parameter_group_name   = "default.postgres16"
  vpc_security_group_ids = [var.vpc_security_group_id]
  username          = "postgres123"
  password          = var.db_password
  skip_final_snapshot    = true
}