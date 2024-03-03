resource "aws_instance" "app_instance" {
  ami           = var.ami_id
  instance_type = var.instance_type
  subnet_id     = var.subnet_id
  security_groups = [var.security_group_id]
  key_name = "d-key"

  tags = {
    Name = "my_video_server"
  }
}

resource "null_resource" "name" {
provisioner "remote-exec" {
    connection {
      type        = "ssh"
      user        = "ec2-user"  
      private_key = file("/Users/dorissiu/Desktop/d-key.pem")
      host        = aws_instance.app_instance.public_ip
    }

    inline = [
      "sudo yum update -y",
      "sudo yum install docker -y",
      "sudo systemctl start docker",
      "sudo systemctl enable docker",
      "sudo docker pull doris321/video-app:latest",
      "sudo docker run -dp 80:5000 doris321/video-app"
    ]
  }
  # wait for ec2 to be created
  depends_on = [aws_instance.app_instance]
}




