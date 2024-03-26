provider "aws" {
  region = "eu-north-1"
}

resource "aws_db_subnet_group" "default" {
  name       = var.db_subnet_group_name  # Ensures variable usage for name
  subnet_ids = var.subnet_ids

  tags = {
    Name = "My DB Subnet Group"
  }
}

resource "aws_db_instance" "default" {
  allocated_storage       = 20
  storage_type            = "gp2"
  engine                  = "postgres"
  engine_version          = "15.5"
  instance_class          = "db.t3.micro"
  identifier              = "database-terraform"
  db_subnet_group_name    = var.db_subnet_group_name 
  vpc_security_group_ids  = ["sg-09c5dd40586ee7079"]

  username                = "postgres"
  password                = var.db_password
  parameter_group_name    = "default.postgres15"
  
  db_name                 = "terraform_DB"
  skip_final_snapshot     = true
  publicly_accessible     = false
  
  depends_on = [aws_db_subnet_group.default]
}

