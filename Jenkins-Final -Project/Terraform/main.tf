module "vpc" {
  source = "./modules/vpc"
  
  name_prefix = var.name_prefix
  vpc_cidr    = var.vpc_cidr
}

module "subnets" {
  source = "./modules/subnet"
  
  name_prefix = var.name_prefix
  vpc_id      = module.vpc.vpc_id
  subnets     = var.subnets_config
}

module "igw" {
  source = "./modules/igw"
  
  name_prefix = var.name_prefix
  vpc_id      = module.vpc.vpc_id 
}

module "security_groups" {
  source = "./modules/security_group"
  
  name_prefix      = var.name_prefix
  vpc_id          = module.vpc.vpc_id
  security_groups = var.security_groups
}



module "route_tables" {
  source = "./modules/route_table"
  
  name_prefix     = var.name_prefix
  vpc_id          = module.vpc.vpc_id
  subnets_config  = var.subnets_config
  subnet_ids      = module.subnets.all_subnet_ids
  igw_id          = module.igw.igw_id
}

module "ec2" {
  source = "./modules/ec2"
  
  name_prefix        = var.name_prefix
  instances          = var.instances
  subnet_ids        = module.subnets.all_subnet_ids
  security_group_ids = module.security_groups.security_group_ids
  public_key_path   = var.public_key_path
  private_key_path  = var.private_key_path
}
