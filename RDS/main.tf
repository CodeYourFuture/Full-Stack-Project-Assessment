resource "aws_security_group" "videodb-sg" {
    name  = var.security_group_name
    description = "Allow inbound traffic"

    ingress {
        from_port   = 5432
        to_port     = 5432
        protocol    = "tcp"
       cidr_blocks = ["0.0.0.0/0"]

    }

    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
         cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = "videodb-sg"
    }

}


resource "aws_db_instance" "videodb" {
  identifier = var.db_identifier
  db_name = var.db_name
  engine     = var.db_engine
  instance_class = var.db_instance_class
  username   = var.db_username
  password   = var.db_password
  allocated_storage =  20
  skip_final_snapshot = true
  engine_version = var.db_engine_version




}