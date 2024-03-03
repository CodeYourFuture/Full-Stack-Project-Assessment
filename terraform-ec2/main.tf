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

# module "vpc" {
#   source      = "./modules/vpc"
#   cidr_block  = "10.0.0.0/16"
# }

# module "security" {
#   source   = "./modules/security"
#   vpc_id   = module.vpc.my_vpc.id
# }

module "backend_instance" {
  source          = "./modules/ec2"
  # ami_id          = "ami-123456"
  # instance_type   = "t2.micro"
  # subnet_id       = module.vpc.private_subnet.id
  # security_group_id = module.security.allow_web.id
  # instance_name   = "backend_instance"
}
