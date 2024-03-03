variable "aws_access_key_id" {
  type        = string
  description = "AWS Access Key ID"
}

variable "aws_secret_access_key" {
  type        = string
  sensitive   = true
  description = "AWS Secret Access Key"
}

variable "vpc_security_group_id" {
  type        = string
  description = "AWS RDS vpc_security_group_id"
  default = "sg-07e4fcb5547f26caf"
}

variable "db_password" {
  type        = string
  description = "db_password"
}
