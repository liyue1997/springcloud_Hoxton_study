package com.mark.eureka_server;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {

//	@Value("${server.port}")
//	String port;

	public static void main(String[] args) {
		SpringApplication.run(EurekaServerApplication.class, args);
	}

}
