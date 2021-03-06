import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";

export class AppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    const vpc = new ec2.Vpc(this, "bolum-Vpc", {
      maxAzs: 3 
    });

    const cluster = new ecs.Cluster(this, "bolum-Cluster", {
      vpc: vpc
    });

    
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "bolum-FargateService", {
      cluster: cluster, 
      cpu: 256, 
      desiredCount: 1, 
      taskImageOptions: { 
        image: ecs.ContainerImage.fromAsset(__dirname + '/../resources'),
        containerPort: 5000
      },
      memoryLimitMiB: 512, 
      publicLoadBalancer: true 
    });
  }
}
