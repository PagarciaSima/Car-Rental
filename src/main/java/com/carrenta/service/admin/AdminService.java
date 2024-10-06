package com.carrenta.service.admin;

import com.carrenta.dto.CarDto;
import com.carrenta.entity.Car;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface AdminService {

    Car postCar(CarDto carDto, MultipartFile image) throws IOException;
}
