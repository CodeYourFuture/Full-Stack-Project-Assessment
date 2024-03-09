resource "aws_s3_bucket" "videso_bucket" {
  bucket = "cyf-videso-tf"
  force_destroy = true

  tags = {
    Name = "cyf-videso-tf"
  }
}

resource "aws_s3_bucket_website_configuration" "videso_bucket" {
 bucket = aws_s3_bucket.videso_bucket.id
   index_document {
    suffix = "index.html"
  }

}

resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.videso_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "public_access_block" {
  bucket = aws_s3_bucket.videso_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.videso_bucket.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = "*",
        Action = [
          "s3:GetObject",
           ],
        Resource = "arn:aws:s3:::cyf-videso-tf/*"
      }
    ]
  })
}



resource "aws_s3_bucket_object" "object" {
  for_each = fileset("${path.module}./build", "**/*")

  bucket = aws_s3_bucket.videso_bucket.id
  key    = each.value
  source = "${path.module}./build/${each.value}"
}

output "bucket_policy" {
  value = aws_s3_bucket_policy.bucket_policy.policy
}
