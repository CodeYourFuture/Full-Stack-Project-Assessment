variable "db_password" {
  description = "The password for the RDS database instance"
  type        = string
  sensitive   = true
}

variable "db_subnet_group_name" {
  description = "The name of the DB subnet group for the RDS instance"
  type        = string
  default     = "tf_data"
}

variable "subnet_ids" {
  description = "List of subnet IDs for the DB Subnet Group"
  type        = list(string)
  default     = [
    "subnet-08b756f6517a09fbe",
    "subnet-0acd6ca43de4591c7"
  ]
}
