package com.carrenta.controller;

import com.carrenta.dto.CarDto;
import com.carrenta.entity.Car;
import com.carrenta.service.admin.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @Operation(summary = "Create a new car")
    @ApiResponse(responseCode = "201", description = "Car created successfully")
    @ApiResponse(responseCode = "400", description = "Car could not be created")
    @PostMapping("/car")
    public ResponseEntity<?> postCar(@RequestBody CarDto carDto) {
        try {
            Car createdCar = adminService.postCar(carDto);
            if (createdCar != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdCar);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Car could not be created.");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while processing the request.");
        }
    }
}
