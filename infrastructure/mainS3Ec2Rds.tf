provider "aws" {
    access_key = "${var.aws_access_key}"
    secret_key = "${var.aws_secret_key}"
    region = "${var.region}"
}

module "s3" {
    source = "./s3"
   
    bucket_name = "reccomendation"       
}

resource "aws_instance" "example_server" {
  ami = "ami-0171207a7acd2a570"
  instance_type = "t2.micro"
  vpc_security_group_ids = [local.recommendationRds_id]

  tags = {
    Name = "reccomendationserver"
  }
  provisioner "remote-exec" {
    connection {
      type        = "ssh"
      user        = "ubuntu"  
      host        = self.public_ip
      private_key = file("/Users/shadifakhri/Downloads/recommendationKey.pem")
    }
inline = [
      "sudo npm update -y",
      "sudo npm install docker -y",
      "sudo systemctl start docker",
      "sudo systemctl enable docker"
    ]

  
}
}

resource "aws_security_group" "recommendationRds" {
  name        = "reccomendation_security_group"
  description = "Allow ports 22, 8080, and 3000"

 
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
     cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}



locals {
  recommendationRds_id = aws_security_group.recommendationRds.id
}

resource "aws_db_instance" "default" {
  allocated_storage = 10
  engine = "postgres"
  instance_class = "db.t3.micro"
  db_name = "recommendation"
  username = "postgres"
  password = var.db-password
  publicly_accessible   = true
  vpc_security_group_ids = [local.recommendationRds_id]
  
  skip_final_snapshot = true // required to destroy
   
}

