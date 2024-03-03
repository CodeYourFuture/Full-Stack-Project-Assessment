terraform {
  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "~> 5.0"
    }
  }
}

provider "aws" {
  region     = "eu-west-2"
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
}

module "template_files" {
    source = "hashicorp/dir/template" 
    base_dir = "${path.module}/../client/build"
}

#create a s3 bucket, attach bucket policy
resource "aws_s3_bucket" "bucket" {
  bucket = "my-video-app"
  force_destroy = true
}

resource "aws_s3_bucket_website_configuration" "hosting_bucket_website_configuration" {
  bucket = aws_s3_bucket.bucket.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "error.html"
  }
}
#enable public acl
resource "aws_s3_bucket_ownership_controls" "bucket" {
  bucket = aws_s3_bucket.bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "bucket" {
  bucket = aws_s3_bucket.bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "my_bucket_policy" {
  bucket = aws_s3_bucket.bucket.id

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::my-video-app/*"
        }
    ]
}
EOF
}

#upload all the files of build folder to the bucket
resource "aws_s3_object" "hosting_bucket_files" {
    bucket = aws_s3_bucket.bucket.id

    for_each = module.template_files.files

    key = each.key
    content_type = each.value.content_type

    source  = each.value.source_path
    content = each.value.content

    etag = each.value.digests.md5
}