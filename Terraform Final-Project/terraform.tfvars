name_prefix = "Gad-Project-ITI"
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
  },
  public2 = {
    cidr_block        = "10.0.2.0/24"  
    availability_zone = "us-east-1b"   
    map_public_ip     = true
  },
  private1 = {
    cidr_block        = "10.0.1.0/24"  
    availability_zone = "us-east-1a"
    map_public_ip     = false
  },
  private2 = {
    cidr_block        = "10.0.3.0/24"  
    availability_zone = "us-east-1b"
    map_public_ip     = false
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
  },
  private = {
    description = "Private SG"
    ingress = [
      {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["10.0.0.0/16"] 
        description = "SSH from VPC"
        security_groups = []
      },
      {
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["10.0.0.0/16"]
        description = "HTTP from VPC"
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
  },

  alb-public = {
    description = "Security group for public-facing ALB"
    ingress = [
      {
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
        description = "HTTP from internet"
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
  },
  alb-internal = {
    description = "Security group for internal ALB"
    ingress = [
      {
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["10.0.0.0/16"]
        description = "HTTP from VPC only"
        security_groups = []
      }
    ]
    egress = [
      {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["10.0.0.0/16"]
        description = "Allow outbound to VPC"
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
  },
  proxy2 = {
    instance_type   = "t3.micro"
    subnet_key      = "public2"
    security_group_keys  = ["public"]
    server_type     = "proxy"
    user_data       = "proxy-userdata.sh"
  },
  backend1 = {
    instance_type   = "t3.micro"
    subnet_key      = "private1"
    security_group_keys  = ["private"]
    server_type     = "backend"
    user_data       = "backend-userdata.sh"
  },
  backend2 = {
    instance_type   = "t3.micro"
    subnet_key      = "private2"
    security_group_keys  = ["private"]
    server_type     = "backend"
    user_data       = "backend-userdata.sh"
  }
}


load_balancers = {
  public = {
    internal       = false
    subnet_keys    = ["public1", "public2"]
    security_group = "alb-public"
    target_instances = ["proxy1", "proxy2"]
    target_port    = 80
  },
  internal = {
    internal       = true
    subnet_keys    = ["private1", "private2"]
    security_group = "alb-internal"
    target_instances = ["backend1", "backend2"]
    target_port    = 80
  }
}