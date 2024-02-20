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


resource "aws_vpc" "video_db_vpc" {
  cidr_block = var.vpc_cidr_block
  enable_dns_hostnames = true
  tags = {
    Name = "video_db_vpc"
  }
}

resource "aws_internet_gateway" "video_db_igw" {
  vpc_id = aws_vpc.video_db_vpc.id
  tags = {
    Name = "video_db_igw"
  } 
}

resource "aws_subnet" "video_db_public_subnet" {
  count = var.subnet_count.public
  vpc_id = aws_vpc.video_db_vpc.id
  cidr_block = var.public_subnet_sidr_block[count.index]
  availability_zone = var.availability-zones[count.index]
  tags = {
    Name = "tutorial_public_subnet_${count.index}"
  }
}

resource "aws_subnet" "video_db_private_subnet" {
  count = var.subnet_count.private
  vpc_id = aws_vpc.video_db_vpc.id
  cidr_block = var.private_subnet_cidr_block[count.index]
  availability_zone = var.availability-zones[count.index]

  tags={
    Name = "video_db_private_subnet_${count.index}"
  }

}

resource "aws_route_table" "video_db_public_rt" {
  vpc_id = aws_vpc.video_db_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.video_db_igw.id
  }
}

resource "aws_route_table_association" "public" {
  count = var.subnet_count.public
  route_table_id = aws_route_table.video_db_public_rt.id
  subnet_id = aws_subnet.video_db_public_subnet[count.index].id
}

resource "aws_route_table" "video_db_private_rt" {
  vpc_id = aws_vpc.video_db_vpc.id
}

resource "aws_route_table_association" "private" {
  count = var.subnet_count.private
  route_table_id = aws_route_table.video_db_private_rt.id
  subnet_id = aws_subnet.video_db_private_subnet[count.index].id
}

resource "aws_security_group" "video_web_sg" {
  name        = "video_web_sg"
  description = "security group for video web servers"
  vpc_id      = aws_vpc.video_db_vpc.id
  
  ingress {
    description = "allow all traffic through HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["192.168.1.108/32"]  # Corrected CIDR block
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


resource "aws_security_group" "video_db_sg" {
  name = "video_db_sg"
  description = "Security group for video database"
  vpc_id = aws_vpc.video_db_vpc.id
  ingress{
    description = "allow PSQL traffic only from EC2"
    from_port = "5432"
    to_port = "5432"
    protocol = "tcp"
    security_groups = [aws_security_group.video_web_sg.id]
  }

  tags={
    Name = "video_db_sg"
  }
}

resource "aws_db_subnet_group" "video_db_subnet_group" {
  name        = "video_db_subnet_group"  
  subnet_ids  = [for subnet in aws_subnet.video_db_private_subnet : subnet.id]
  description = "DB subnet group for video"
}

 resource "aws_db_instance" "video_database" {
  allocated_storage = var.settings.database.allocated_storage
  engine = var.settings.database.engine
  engine_version = var.settings.database.engine_version
  instance_class = var.settings.database.instance_class
  name = var.settings.database.db_name
  username = var.db_username
  password = var.db_password
  db_subnet_group_name = aws_db_subnet_group.video_db_subnet_group.id
  vpc_security_group_ids = [aws_security_group.video_db_sg.id]
  skip_final_snapshot = var.settings.database.skip_final_snapshot
   
 }
resource "aws_key_pair" "video-pair-new" {
  key_name   = "video-pair-new.pem"  
  public_key = file("~/.ssh/video-pair-new.pem.pub")
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


 resource "aws_instance" "video_web" {
  count                   = var.settings.web-app.count
  ami                     = data.aws_ami.ubuntu.id
  instance_type           = var.settings.web-app.instance_type
  subnet_id               = aws_subnet.video_db_public_subnet[count.index].id
  key_name                = aws_key_pair.video-pair-new.key_name 
  vpc_security_group_ids  = [aws_security_group.video_web_sg.id]
  tags = {
    Name = "tutorial_web_${count.index}"
  }
}


 resource "aws_eip" "video_web_eip" {
   count = var.settings.web-app.count
   instance = aws_instance.video_web[count.index].id
   vpc = true
   tags = {
     Name = "video_web_eip_${count.index}"
   }
 }