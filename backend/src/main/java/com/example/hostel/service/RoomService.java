package com.example.hostel.service;

import com.example.hostel.entity.Room;
import java.util.List;

public interface RoomService {
    List<Room> getAllRooms();
    Room addRoom(Room room);
    // roomId-kku bathula roomNumber use pannuvom, appo thaan payment sariya update aagum
    void updateRoomStatusByNumber(String roomNumber, String status);
    void updateRoomStatus(Long roomId, String status); 
}