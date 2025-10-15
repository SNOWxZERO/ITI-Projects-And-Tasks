output "workspace_info" {
  description = "Current Terraform workspace information"
  value = {
    current_workspace = terraform.workspace
    environment      = var.name_prefix
    region          = var.aws_region
  }
}

output "Testing_Urls" {
  description = "Testing URLs"
  value = {
    proxy1_direct    = "${module.ec2.proxy_public_ips["proxy1"]}"
  }
}
