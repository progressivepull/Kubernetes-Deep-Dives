# 0.Introduction

* [0.1 Your first project on Kubernetes](./INTRODUCTION/0.1_Your_first_project_on_Kubernetes.md)

* [0.2 What you should know](./INTRODUCTION/0.2_What_you_should_know.md)

# 1._Kubernetes_at_a_Glance

 * [ 1.1 Our application before Kubernetes ]( ./LESSON_1/1.1_Our_application_before_Kubernetes/1.1_Our_application_before_Kubernetes.md )

 * [ 1.2 What is Kubernetes ]( ./LESSON_1/1.1_Our_application_before_Kubernetes/1.2_What_is_Kubernetes.md )

 * [ 1.3 Our application after Kubernetes ]( ./LESSON_1/1.3_Our_application_after_Kubernetes/1.3_Our_application_after_Kubernetes.md )

* [ 1.4 Recommended courses ]( ./LESSON_1/1.4_Recommended_courses/1.4_Recommended_courses.md )

 # 2._Setting_Up_Your_Environment

 * [ 2.1 Tools we will be using ]( ./LESSON_2/2.1_Tools_we_will_be_using/2.1_Tools_we_will_be_using.md )

 * [ 2.2 Preparing Windows machines ]( ./LESSON_2/2.2_Preparing_Windows_machines/2.2_Preparing_Windows_machines.md )

 * [ 2.3 Installing Podman Desktop on macOS ]( ./LESSON_2/2.3_Installing_Podman_Desktop_on_macOS/2.3_Installing_Podman_Desktop_on_macOS.md )

 * [ 2.4 Installing Podman Desktop on Windows ]( ./LESSON_2/2.4_Installing_Podman_Desktop_on_Windows/2.4_Installing_Podman_Desktop_on_Windows.md )

 * [ 2.5 Other popular container managers ]( ./LESSON_2/2.5_Other_popular_container_managers/2.5_Other_popular_container_managers.md )

 * [ 2.6 Installing kind ]( ./LESSON_2/2.6_Installing_kind/2.6_Installing_kind.md )

 * [ 2.7 Installing Helm ]( ./LESSON_2/2.7_Installing_Helm/2.7_Installing_Helm.md )
 
 * [ 2.8 Installing AWS CLI and Azure CLI ]( ./LESSON_2/2.8_Installing_AWS_CLI_and_Azure_CLI/2.8_Installing_AWS_CLI_and_Azure_CLI.md )
 
* [ 2.9 Installing AWS eksctl ]( ./LESSON_2/2.9_Installing_AWS_eksctl/2.9_Installing_AWS_eksctl.md )
 
* [ 2.10 Configuring AWS access ]( ./LESSON_2/2.10_Configuring_AWS_access/2.10_Configuring_AWS_access.md )
 
* [ 2.11 Configuring Azure access interactively ]( ./LESSON_2/2.11_Configuring_Azure_access_interactively/2.11_Configuring_Azure_access_interactively.md )
 
* [ 2.12 Configuring Azure access with a service principal ]( ./LESSON_2/2.12_Configuring_Azure_access_with_a_service_principal/2.12_Configuring_Azure_access_with_a_service_principal.md )

* [2.13 Chapter Quiz](./LESSON_2/2.13_Chapter_Quiz/2.13_Chapter_Quiz.md)
 
# 3._Containerizing_Explore_California
 
* [ 3.1 Lets containerize Explore California ]( ./LESSON_3/3.1_Lets_containerize_Explore_California/3.1_Lets_containerize_Explore_California.md )
 
* [ 3.2 Creating the Dockerfile ]( ./LESSON_3/3.2_Creating_the_Dockerfile/3.2_Creating_the_Dockerfile.md )
 
* [ 3.3 Building your image with Podman ]( ./LESSON_3/3.3_Building_your_image_with_Podman/3.3_Building_your_image_with_Podman.md )
 
* [ 3.4 Building your image with Docker Build ]( ./LESSON_3/3.4_Building_your_image_with_Docker_Build/3.4_Building_your_image_with_Docker_Build.md )
 
* [ 3.5 Testing your changes ]( ./LESSON_3/3.5_Testing_your_changes/3.5_Testing_your_changes.md )
 
* [ 3.6 Challenge Changing the website's title ]( ./LESSON_3/3.6_Challenge_Changing_the_website's_title/3.6_Challenge_Changing_the_website's_title.md )
 
* [ 3.7 Solution Changing the website's title ]( ./LESSON_3/3.7_Solution_Changing_the_website's_title/3.7_Solution_Changing_the_website's_title.md )

* [ 3.8 Chapter Quiz]( ./LESSON_3/3.8_Chapter_Quiz/3.8_Chapter_Quiz.md )


# 4._Running_Explore_California_Locally_within_Kubernetes
 
* [ 4.1 Running your app locally within Kubernetes ]( ./LESSON_4/4.1_Running_your_app_locally_within_Kubernetes.md )
 
* [ 4.2 Creating your kind cluster ]( ./LESSON_4/4.2_Creating_your_kind_cluster.md )
 
* [ 4.3 Creating Kubernetes clusters locally ]( ./LESSON_4/4.3_Creating_Kubernetes_clusters_locally.md )
 
* [ 4.4 Scaling Explore California with a deployment ]( ./LESSON_4/4.4_Scaling_Explore_California_with_a_deployment.md )
 
* [ 4.5 Exposing Explore California with a service ]( ./LESSON_4/4.5_Exposing_Explore_California_with_a_service.md )
 
* [ 4.6 Routing Explore California with an ingress ]( ./LESSON_4/4.6_Routing_Explore_California_with_an_ingress.md )
 
* [ 4.7 Installing NGINX ingress controller ]( ./LESSON_4/4.7_Installing_NGINX_ingress_controller.md )
 
* [ 4.8 Popular Ingress controllers ]( ./LESSON_4/4.8_Popular_Ingress_controllers.md )
 
* [ 4.9 Testing your changes ]( ./LESSON_4/4.9_Testing_your_changes.md )
 
* [ 4.10 Adding HTTPS to your website with cert-manager ]( ./LESSON_4/4.10_Adding_HTTPS_to_your_website_with_cert-manager.md )
 
* [ 4.11 Challenge Change the port number ]( ./LESSON_4/4.11_Challenge_Change_the_port_number.md )
 
* [ 4.12 Solution Change the port number ]( ./LESSON_4/4.12_Solution_Change_the_port_number.md )
 
# 5._Packaging_Explore_California_with_Helm
 
* [ 5.1 Why Helm ]( ./LESSON_5/5.1_Why_Helm.md )
 
* [ 5.2 Popular Kubernetes package managers ]( ./LESSON_5/5.2_Popular_Kubernetes_package_managers.md )
 
* [ 5.3 Initializing your chart ]( ./LESSON_5/5.3_Initializing_your_chart.md )
 
* [ 5.4 Templatizing the deployment ]( ./LESSON_5/5.4_Templatizing_the_deployment.md )
 
* [ 5.5 Testing your templates ]( ./LESSON_5/5.5_Testing_your_templates.md )
 
* [ 5.6 Templatizing the service and ingress ]( ./LESSON_5/5.6_Templatizing_the_service_and_ingress.md )
 
* [ 5.7 Templatizing the cert-manager issuer ]( ./LESSON_5/5.7_Templatizing_the_cert-manager_issuer.md )
 
* [ 5.8 Deploying your Helm chart ]( ./LESSON_5/5.8_Deploying_your_Helm_chart.md )
 
* [ 5.9 Challenge Explore California sale ]( ./LESSON_5/5.9_Challenge_Explore_California_sale.md )
 
* [ 5.10 Solution Explore California sale ]( ./LESSON_5/5.10_Solution_Explore_California_sale.md )
 
# 6._Deploying_Explore_California_into_AWS_EKS
 
* [ 6.1 From kind to EKS Whats changing ]( ./LESSON_6/6.1_From_kind_to_EKS_Whats_changing.md )
 
* [ 6.2 Deploying your EKS cluster with eksctl ]( ./LESSON_6/6.2_Deploying_your_EKS_cluster_with_eksctl.md )
 
* [ 6.3 Logging into your EKS cluster ]( ./LESSON_6/6.3_Logging_into_your_EKS_cluster.md )
 
* [ 6.4 Installing NGINX ingress controller into EKS ]( ./LESSON_6/6.4_Installing_NGINX_ingress_controller_into_EKS.md )
 
* [ 6.5 Creating an ECR repository ]( ./LESSON_6/6.5_Creating_an_ECR_repository.md )
 
* [ 6.6 Deploying the Explore California image into ECR ]( ./LESSON_6/6.6_Deploying_the_Explore_California_image_into_ECR.md )
 
* [ 6.7 Deploying Explore California into EKS ]( ./LESSON_6/6.7_Deploying_Explore_California_into_EKS.md )
 
* [ 6.8 Installing cert-manager into EKS ]( ./LESSON_6/6.8_Installing_cert-manager_into_EKS.md )
 
# 7._Deploying_Explore_California_into_Azure_AKS
 
* [ 7.1 From kind to AKS Whats changing ]( ./LESSON_7/7.1_From_kind_to_AKS_Whats_changing.md )
 
* [ 7.2 Deploying your AKS cluster with the Azure CLI ]( ./LESSON_7/7.2_Deploying_your_AKS_cluster_with_the_Azure_CLI.md )
 
* [ 7.3 Logging into your AKS cluster ]( ./LESSON_7/7.3_Logging_into_your_AKS_cluster.md )
 
* [ 7.4 Installing NGINX ingress controller into AKS ]( ./LESSON_7/7.4_Installing_NGINX_ingress_controller_into_AKS.md )
 
* [ 7.5 Creating an ACR repository ]( ./LESSON_7/7.5_Creating_an_ACR_repository.md )
 
* [ 7.6 Deploying the Explore California image into ACR ]( ./LESSON_7/7.6_Deploying_the_Explore_California_image_into_ACR.md )
 
* [ 7.7 Deploying Explore California into AKS ]( ./LESSON_7/7.7_Deploying_Explore_California_into_AKS.md )
 
* [ 7.8 Installing cert-manager into AKS ]( ./LESSON_7/7.8_Installing_cert-manager_into_AKS.md )

# 8._Conclusion

* [8.1 Next steps](./CONCLUSION/8.1_Next_steps.md)
 
