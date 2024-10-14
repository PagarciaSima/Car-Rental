package com.carrenta.service.admin;

import com.carrenta.dto.CarDto;
import com.carrenta.entity.Car;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AdminService {

    Car postCar(CarDto carDto, MultipartFile image) throws IOException;
    List<CarDto> getAllCars();
    void deleteCar(Long id);
    CarDto getCarById(Long id);
    public boolean updateCar(Long carId, CarDto carDto, MultipartFile image) throws IOException;
}
