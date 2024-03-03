variable "ami_id" {
  type        = string
  description = "AWS ec2 ami_id"
  default = "ami-0171207a7acd2a570"
}

variable "instance_type" {
  type        = string
  description = "AWS ec2 instance_type"
  default = "t2.micro"
}

variable "subnet_id" {
  type        = string
  description = "AWS ec2 subnet_id"
  default = "subnet-0dd915739859e4a31"
}

variable "security_group_id" {
  type        = string
  description = "AWS ec2 security_group_id"
  default = "sg-04c4f80b88dfa07ee"
}


