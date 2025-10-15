data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "state"
    values = ["available"]
  }
}

resource "aws_key_pair" "mykey" {
  key_name   = "mykey"
  public_key = file(var.public_key_path)
  tags = { Name = "${var.name_prefix}-key" }
}

resource "aws_instance" "servers" {
  for_each = var.instances

  ami                    = data.aws_ami.amazon_linux.id
  instance_type         = each.value.instance_type
  key_name              = aws_key_pair.mykey.key_name
  vpc_security_group_ids = [for sg_key in each.value.security_group_keys : var.security_group_ids[sg_key]]
  subnet_id             = var.subnet_ids[each.value.subnet_key]


  tags = {
    Name = "${var.name_prefix}-${each.key}"
    Type = each.value.server_type
  }
  
}

