variable "aws_region" {
  default = "eu-west-2"
}
variable "vpc_cidr_block" {
    description = "cidr Block for VPC"
    type = string
    default = "10.0.0.0/16"
}

variable "subnet_count" {
    description = "Number of subnets"
    type = map(number)
    default = {
      public = 1,
      private = 2
    }
}

variable "availability-zones" {
  default = [
    "eu-west-2a",
    "eu-west-2b"
  ]
  type = list(string)
}

variable "settings" {
    description = "Configuration settings"
    type = map(any)
    default = {
      "database" = {
        allocated_storage = 10
        engine = "postgres"
        engine_version = "11.17"
        instance_class       = "db.t3.micro"
        db_name = "video_db"
        skip_final_snapshot = true
      },
      "web-app" = {
        count = 1
        instance_type = "t2.micro"
      }
    }
  
}

variable "public_subnet_sidr_block" {
    description = "Available CiDR block for public subnet"
    type = list(string)
    default = [ 
        "10.0.1.0/24",
        "10.0.2.0/24",
        "10.0.3.0/24",
        "10.0.4.0/24"
         ]
  
}

variable "private_subnet_cidr_block" {
  description = "Availabla cidr block for privat subnet"
  type = list(string)
  default = [ 
    "10.0.101.0/24",
    "10.0.102.0/24",
    "10.0.103.0/24",
    "10.0.104.0/24"
     ]
}

variable "my_ip" {
  description = "ip"
  type = string
  sensitive = true
}

variable "db_username" {
    description = "master username"
    type = string
    sensitive = true
}

variable "db_password" {
   description = "password"
   type = string
   sensitive = true
}