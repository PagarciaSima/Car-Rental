package com.carrenta.service.admin;

import com.carrenta.dto.CarDto;
import com.carrenta.entity.Car;

import java.io.IOException;

public interface AdminService {

    Car postCar(CarDto carDto) throws IOException;
}
