resource "aws_instance" "videso-tf" {
  ami           = "ami-0e5f882be1900e43b"
  instance_type = "t2.micro"
  key_name      = aws_key_pair.vid-key-tf.key_name

  tags = {
    Name = "videso-tf"
  }
  vpc_security_group_ids = [aws_security_group.TF_SG.id]
}


resource "aws_security_group" "TF_SG" {
    name        = "security_group_TF"
    description = "Allow TLS EC2 traffic to the instance"
    vpc_id      = "vpc-0648145579e063003"

    tags = {
        Name = "TF_SG"
    }

    ingress {
        description = "HTTPS"
        from_port   = 443
        to_port     = 443
        protocol    = "tcp"
        cidr_blocks      = ["0.0.0.0/0"]
       ipv6_cidr_blocks = ["::/0"]
    }
    ingress {
        description = "HTTP"
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks      = ["0.0.0.0/0"]
       ipv6_cidr_blocks = ["::/0"]
    }

    ingress {
        description = "SSH"
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks      = ["0.0.0.0/0"]
       ipv6_cidr_blocks = ["::/0"]
    }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}



resource "tls_private_key" "rsa" {
  algorithm = "RSA"
  rsa_bits  =  4096
}

resource "local_file" "vid-key-tf" {
  content  = tls_private_key.rsa.private_key_pem
  filename = "vid-key-tf.pem"
}

resource "aws_key_pair" "vid-key-tf" {
  key_name   = "vid-key-tf"
  public_key = tls_private_key.rsa.public_key_openssh
}
