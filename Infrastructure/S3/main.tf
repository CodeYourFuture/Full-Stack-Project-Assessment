provider "aws" {
  region = "eu-north-1"
}

resource "aws_s3_bucket" "youtubesaver2" {
  bucket = "youtubesaver2"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

resource "aws_s3_bucket_public_access_block" "youtubesaver2_public_access" {
  bucket = aws_s3_bucket.youtubesaver2.id

  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "youtubesaver2_policy" {
  bucket = aws_s3_bucket.youtubesaver2.id

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Statement1",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::youtubesaver2/*"
    }
  ]
}
POLICY
}






