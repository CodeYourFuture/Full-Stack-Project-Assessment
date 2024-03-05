resource "aws_s3_bucket" "demos3" {
    bucket = "${var.bucket_name}" 
    acl = "${var.acl_value}"   
}

resource "aws_s3_bucket_public_access_block" "example" {
    bucket = aws_s3_bucket.demos3.id

    block_public_acls = false
    block_public_policy = false
}
resource "aws_s3_bucket_policy" "public_access" {
  bucket = aws_s3_bucket.demos3.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "PublicReadGetObject"
      Effect    = "Allow"
      Principal = "*"
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.demos3.arn}/*"
    }]
  })
}