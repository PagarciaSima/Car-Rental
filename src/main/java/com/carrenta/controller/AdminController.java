package com.carrenta.controller;

import com.carrenta.dto.CarDto;
import com.carrenta.entity.Car;
import com.carrenta.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping(value = "/car", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> postCar(
            @RequestPart("car") CarDto carDto,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            Car createdCar = adminService.postCar(carDto, image);
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
