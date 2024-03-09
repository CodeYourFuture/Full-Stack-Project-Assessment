variable "db_identifier" {
  description = "The database identifier"
  type        = string
  default = "videodbtf"
}

variable "db_name" {
type = string
default = "videodbtf"
}

variable "db_engine" {
  type = string
  default = "postgres"
}

variable "db_engine_version" {
  type = string
  default = "16.1"

}

variable "security_group_name" {
  type = string
  default = "videodb-sg"

}

variable "db_instance_class" {
  type = string
  default = "db.t3.micro"
}

variable "db_username" {
  type = string
  default = "postgres"

}

variable "db_password" {
  type = string
  default = "videouser"
}

variable "vpc_security_group_ids" {
  type = string
  default ="default"

}