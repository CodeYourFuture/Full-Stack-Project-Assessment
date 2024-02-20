provider "aws" {
    region = "eu-west-2"
    access_key = var.access_key
    secret_key = var.secret_key
}

# Define variables
variable "access_key" {}
variable "secret_key" {}

resource "aws_s3_bucket" "video-app-olha" {
  bucket = "video-app-olha"
}


resource "aws_s3_bucket_ownership_controls" "video-app-olha" {
  bucket = aws_s3_bucket.video-app-olha.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "video-app-olha" {
  bucket = aws_s3_bucket.video-app-olha.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "video-app-olha" {
  depends_on = [
    aws_s3_bucket_ownership_controls.video-app-olha,
    aws_s3_bucket_public_access_block.video-app-olha,
  ]

  bucket = aws_s3_bucket.video-app-olha.id
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "video-app-olha-web" {
  bucket = aws_s3_bucket.video-app-olha.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }

  routing_rule {
    condition {
      key_prefix_equals = "docs/"
    }
    redirect {
      replace_key_prefix_with = "documents/"
    }
  }

  depends_on = [aws_s3_bucket.video-app-olha]
}
