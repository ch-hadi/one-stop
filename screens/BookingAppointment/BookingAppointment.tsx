import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BookingModal from '@/components/BookingModel/BookingByCalendar';

const { width } = Dimensions.get('window');

type Slot = {
  id: string;
  time: string;
  isBooked: boolean;
};

type BookingData = {
  [date: string]: {
    slots: Slot[];
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
};

type Appointment = {
  id: string;
  status: string;
  doctorName: string;
  startTime: string;
  endTime: string;
  doctorImage: string;
};

const HEADER_HEIGHT = 60;
const DATE_ITEM_WIDTH = 40;
const DATE_ITEM_MARGIN = 5;

export default function BookingByCalendar() {
  const [selectedDate, setSelectedDate] = useState('');
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dates, setDates] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMonthPickerVisible, setIsMonthPickerVisible] = useState(false);

  useEffect(() => {
    fetchBookingData();
    generateDates(currentMonth);
    fetchAppointments();
  }, [currentMonth]);

  const fetchBookingData = async () => {
    // Simulating API call to fetch booking data
    const data: BookingData = {
      '2023-05-15': {
        slots: [
          { id: '1', time: '09:00 AM', isBooked: false },
          { id: '2', time: '10:00 AM', isBooked: true },
          { id: '3', time: '11:00 AM', isBooked: false },
        ],
      },
      '2023-05-16': {
        slots: [
          { id: '4', time: '02:00 PM', isBooked: false },
          { id: '5', time: '03:00 PM', isBooked: false },
          { id: '6', time: '04:00 PM', isBooked: true },
        ],
      },
    };
    setBookingData(data);
  };

  const generateDates = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateArray = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
    setDates(dateArray);
  };

  const fetchAppointments = () => {
    // Simulating API call to fetch appointments
    const mockAppointments: Appointment[] = [
      {
        id: '1',
        status: 'Accepted',
        doctorName: 'Dr. Jenny',
        startTime: '09:00 AM',
        endTime: '10:00 AM',
        doctorImage: 'https://static.vecteezy.com/system/resources/previews/044/846/309/non_2x/woman-doctor-standing-and-holding-tablet-on-isolated-transparent-background-free-png.png',
      },
      {
        id: '3',
        status: 'Rejected',
        doctorName: 'Dr. Zodic',
        startTime: '09:00 AM',
        endTime: '10:00 AM',
        doctorImage: 'https://static.vecteezy.com/system/resources/previews/044/846/309/non_2x/woman-doctor-standing-and-holding-tablet-on-isolated-transparent-background-free-png.png',
      },
      {
        id: '4',
        status: 'Rejected',
        doctorName: 'Dr. Mikor',
        startTime: '09:00 AM',
        endTime: '10:00 AM',
        doctorImage: 'https://static.vecteezy.com/system/resources/previews/044/846/309/non_2x/woman-doctor-standing-and-holding-tablet-on-isolated-transparent-background-free-png.png',
      },
      {
        id: '5',
        status: 'Accepted',
        doctorName: 'Dr. Anum',
        startTime: '09:00 AM',
        endTime: '10:00 AM',
        doctorImage: 'https://static.vecteezy.com/system/resources/previews/044/846/309/non_2x/woman-doctor-standing-and-holding-tablet-on-isolated-transparent-background-free-png.png',
      },
      {
        id: '7',
        status: 'Rejected',
        doctorName: 'Dr. Mehak',
        startTime: '09:00 AM',
        endTime: '10:00 AM',
        doctorImage: 'https://static.vecteezy.com/system/resources/previews/044/846/309/non_2x/woman-doctor-standing-and-holding-tablet-on-isolated-transparent-background-free-png.png',
      },
      // Add more mock appointments as needed
    ];
    setAppointments(mockAppointments);
  };

  const handleDateSelect = (date: DateData) => {
    setSelectedDate(date.dateString);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: Slot) => {
    if (!slot.isBooked) {
      setSelectedSlot(slot);
    }
  };

  const handleBooking = () => {
    if (selectedDate && selectedSlot) {
      setIsModalVisible(true);
    }
  };

  const handleBookAppointment = (bookingData: any) => {
    // Implement your booking logic here
    console.log('Booking data:', bookingData);
    // Update the bookingData state to reflect the new booking
    setBookingData((prevData) => ({
      ...prevData,
      [selectedDate]: {
        ...prevData[selectedDate],
        slots: prevData[selectedDate].slots.map((slot) =>
          slot.id === selectedSlot?.id ? { ...slot, isBooked: true } : slot
        ),
      },
    }));
    setSelectedSlot(null);
  };

  const renderDateItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.dateItem,
        selectedDate === `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}-${item.padStart(2, '0')}` && styles.selectedDateItem,
      ]}
      onPress={() => setSelectedDate(`${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}-${item.padStart(2, '0')}`)}
    >
      <Text style={[styles.dateItemText, selectedDate === `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}-${item.padStart(2, '0')}` && styles.selectedDateItemText]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderAppointmentCard = ({ item }: { item: Appointment }) => (
    <View style={styles.appointmentCard}>
      <Image source={{ uri: item.doctorImage }} style={styles.doctorImage} />
      <View style={styles.appointmentInfo}>
        <Text style={styles.appointmentStatus}>Status: {item.status}</Text>
        <Text style={styles.doctorName}>{item.doctorName}</Text>
        <Text style={styles.appointmentTime}>
          {item.startTime} - {item.endTime}
        </Text>
      </View>
    </View>
  );

  const changeMonth = (increment: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
    setIsMonthPickerVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwohEIBoJMqZuESabXPrfmMp7NsiTXNV6ow&s' }}
          style={styles.userImage}
        />
        <Text style={styles.headerTitle}>Appointment</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => setIsMonthPickerVisible(true)}>
          <Text style={styles.monthTitle}>
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </Text>
        </TouchableOpacity>
        <FlatList
          data={dates}
          renderItem={renderDateItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateList}
        />
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        {appointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentCardWrapper}>
            {renderAppointmentCard({ item: appointment })}
          </View>
        ))}
      </ScrollView>
      <BookingModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onBookAppointment={handleBookAppointment}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isMonthPickerVisible}
        onRequestClose={() => setIsMonthPickerVisible(false)}
      >
        <View style={styles.monthPickerContainer}>
          <View style={styles.monthPicker}>
            <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.monthPickerButton}>
              <Text style={styles.monthPickerButtonText}>Previous Month</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeMonth(1)} style={styles.monthPickerButton}>
              <Text style={styles.monthPickerButtonText}>Next Month</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsMonthPickerVisible(false)} style={styles.monthPickerButton}>
              <Text style={styles.monthPickerButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: HEADER_HEIGHT,
    backgroundColor: '#4CAF50',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    // flexGrow: 1,
    padding: 16,
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  dateList: {
    paddingBottom: 16,
  },
  dateItem: {
    width: 30,
    height: 30,
    borderRadius: DATE_ITEM_WIDTH / 2,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DATE_ITEM_MARGIN,
  },
  selectedDateItem: {
    backgroundColor: '#4CAF50',
  },
  dateItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedDateItemText: {
    color: 'white',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  appointmentCardWrapper: {
    marginBottom: 16,
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(100, 149, 237, 0.3)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentStatus: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#666',
  },
  slotsContainer: {
    marginTop: 16,
  },
  slotsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  slotsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slotButton: {
    width: (width - 48) / 3,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    marginBottom: 8,
    alignItems: 'center',
  },
  bookedSlot: {
    backgroundColor: '#ffcccb',
  },
  selectedSlot: {
    backgroundColor: '#90ee90',
  },
  slotText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bookedSlotText: {
    color: '#888',
  },
  selectedSlotText: {
    color: '#000',
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  monthPickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  monthPicker: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  monthPickerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginVertical: 5,
  },
  monthPickerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});