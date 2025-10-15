name_prefix = "Gad-Project(Jenkins)-ITI"
aws_region = "us-east-1"
aws_availability_zone = "us-east-1a"
vpc_cidr = "10.0.0.0/16"
public_key_path  = "~/.ssh/mykey.pub"
private_key_path = "~/.ssh/mykey"

subnets_config = {
  public1 = {
    cidr_block        = "10.0.0.0/24"  
    availability_zone = "us-east-1a"
    map_public_ip     = true
  }
}

security_groups = {
  public = {
    description = "Public SG"
    ingress = [
      {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"  
        cidr_blocks = ["0.0.0.0/0"]
        description = "SSH from anywhere"
        security_groups = []
      },
      {
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
        description = "HTTP from anywhere"
        security_groups = []
      },
      {
        from_port   = 30000
        to_port     = 30000
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
        description = "Calculator app"
        security_groups = []
  }
    ]
    egress = [
      {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
        description = "Allow all outbound"
        security_groups = []
      }
    ]
  }
}


instances = {
  proxy1 = {
    instance_type   = "t3.micro"
    subnet_key      = "public1"
    security_group_keys  = ["public"]
    server_type     = "proxy"
    user_data       = "proxy-userdata.sh"
  }
}