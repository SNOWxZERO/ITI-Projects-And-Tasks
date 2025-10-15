resource "aws_route_table" "public" {
  vpc_id = var.vpc_id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = var.igw_id
  }
  
  tags = { Name = "${var.name_prefix}-public-rt" }
}



resource "aws_route_table_association" "public_assoc" {
  for_each = {
    for k, v in var.subnets_config : k => v  
    if v.map_public_ip == true
  }

  subnet_id      = var.subnet_ids[each.key]
  route_table_id = aws_route_table.public.id
}
