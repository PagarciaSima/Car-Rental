package com.carrenta.controller;

import com.carrenta.dto.CarDto;
import com.carrenta.entity.Car;
import com.carrenta.service.admin.AdminService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping(value = "/car", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> postCar(
            @RequestPart("car") String carDtoJson,  // String para recibir el JSON
            @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            // Convertir el JSON en un objeto CarDto usando ObjectMapper
            ObjectMapper objectMapper = new ObjectMapper();
            CarDto carDto = objectMapper.readValue(carDtoJson, CarDto.class);

            // Pasar el CarDto y la imagen al servicio
            Car createdCar = adminService.postCar(carDto, image);
            if (createdCar != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdCar.getCarDto());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Car could not be created.");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while processing the request.");
        }
    }


    @GetMapping("/cars")
    public ResponseEntity<?> getAllCars() {
        return ResponseEntity.ok(adminService.getAllCars());
    }

    @DeleteMapping("/car/{id}")
    public ResponseEntity<Map<String,String>> deleteCar(@PathVariable Long id) {
        adminService.deleteCar(id);
        return ResponseEntity.ok(Collections.singletonMap("message", "Car deleted successfully."));
    }
}
