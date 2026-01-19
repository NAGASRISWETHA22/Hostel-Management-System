package com.example.hostel.serviceImpl;

import com.example.hostel.entity.Room;
import com.example.hostel.repository.RoomRepository;
import com.example.hostel.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room addRoom(Room room) {
        // SQL 'default value' error pariharikkaan
        if (room.getIsOccupied() == null) room.setIsOccupied(0);
        if (room.getStatus() == null) room.setStatus("Available");
        return roomRepository.save(room);
    }

    @Override
    public void updateRoomStatus(Long roomId, String status) {
        Room room = roomRepository.findById(roomId)
            .orElseThrow(() -> new RuntimeException("Room not found"));
        
        room.setStatus(status);
        // Payment success aakumbol update cheyyaan
        if ("OCCUPIED".equalsIgnoreCase(status)) {
            room.setIsOccupied(1);
        } else {
            room.setIsOccupied(0);
        }
        roomRepository.save(room);
    }

    @Override
    public void updateRoomStatusByNumber(String roomNumber, String status) {
        Room room = roomRepository.findByRoomNumber(roomNumber)
            .orElseThrow(() -> new RuntimeException("Room not found"));
        room.setStatus(status);
        room.setIsOccupied(status.equalsIgnoreCase("Occupied") ? 1 : 0);
        roomRepository.save(room);
    }
}