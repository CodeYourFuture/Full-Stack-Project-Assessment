provider "aws" {
  region = "eu-north-1"
}

resource "aws_instance" "backend" {
  ami                    = "ami-0014ce3e52359afbd"
  instance_type          = "t3.micro"
  key_name               = "youtubesaver-nf"
  iam_instance_profile   = "s3toec2"
  subnet_id              = "subnet-08b756f6517a09fbe"
  vpc_security_group_ids  = ["sg-09c5dd40586ee7079"]

  root_block_device {
    volume_type = "gp2"
    volume_size = 8
  }

  tags = {
    Name = "backend"
  }
}

