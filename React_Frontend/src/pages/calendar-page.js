import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';  // Monthly view
import timeGridPlugin from '@fullcalendar/timegrid'; // Weekly and time-grid views
import interactionPlugin from '@fullcalendar/interaction'; // For interactions like click
import { getEvents, createEvent, updateEvent, deleteEvent } from '../services/event.service';
import { PageLayout } from '../components/page-layout';
import { useAuth0 } from '@auth0/auth0-react';

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [eventDetails, setEventDetails] = useState({ id: null, title: '', start: '', end: '', description: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const token = await getAccessTokenSilently();
            const res = await getEvents(token);
            setEvents(res.data);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        }
    };

    const handleDateClick = (arg) => {
        setEventDetails({ ...eventDetails, start: arg.dateStr, end: arg.dateStr }); // Set both start and end
        setIsModalOpen(true);
    };

    const handleEventClick = (clickInfo) => {
        const { id, title, start, end, extendedProps } = clickInfo.event;
        setEventDetails({
            id: id,
            title: title,
            start: start.toISOString().slice(0, 16),  // Format to 'YYYY-MM-DDTHH:mm'
            end: end ? end.toISOString().slice(0, 16) : '',  // Handle end date
            description: extendedProps.description || '',
        });
        setIsModalOpen(true);
    };

    const handleDeleteEvent = async () => {
        if (window.confirm(`Delete event '${eventDetails.title}'?`)) {
            try {
                const token = await getAccessTokenSilently();
                await deleteEvent(eventDetails.id, token);
                fetchEvents();
                setIsModalOpen(false);
                setEventDetails({ id: null, title: '', start: '', end: '', description: '' });  // Reset form fields
            } catch (error) {
                console.error("Failed to delete event:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();
            if (eventDetails.id) {
                await updateEvent(eventDetails.id, eventDetails, token);  // Update event
            } else {
                await createEvent(eventDetails, token);  // Create new event
            }
            setIsModalOpen(false);
            fetchEvents();
            setEventDetails({ id: null, title: '', start: '', end: '', description: '' });  // Reset form fields
        } catch (error) {
            console.error("Failed to create/update event:", error);
        }
    };

    return (
        <PageLayout>
            <div className="content-layout">
                <h1 id="page-title" className="content__title">My Calendar</h1>
                <div className="calendar-container">
                    <div className="sidebar">
                        <h2>Event Details</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Event Title"
                                value={eventDetails.title}
                                onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
                                required
                            />
                            <input
                                type="datetime-local"
                                value={eventDetails.start}
                                onChange={(e) => setEventDetails({ ...eventDetails, start: e.target.value })}
                                required
                            />
                            <input
                                type="datetime-local"
                                placeholder="End Date & Time"
                                value={eventDetails.end}
                                onChange={(e) => setEventDetails({ ...eventDetails, end: e.target.value })}
                            />
                            <textarea
                                placeholder="Description"
                                value={eventDetails.description}
                                onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
                            ></textarea>
                            <button type="submit">{eventDetails.id ? 'Update Event' : 'Add Event'}</button>
                            {eventDetails.id && (
                                <button type="button" onClick={handleDeleteEvent}>Delete Event</button>
                            )}
                        </form>
                    </div>
                    <div className="calendar">
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"  // Default view is month
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek'  // Options for monthly and weekly views
                            }}
                            events={events}
                            dateClick={handleDateClick}
                            eventClick={handleEventClick}
                        />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default CalendarPage;
