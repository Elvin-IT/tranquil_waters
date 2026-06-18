import { useState, useEffect, FormEvent } from 'react';
import { Calendar, User, Eye, Send, CheckCircle2, Trash2, Edit2, ShieldAlert } from 'lucide-react';
import { Inquiry, Villa } from '../types';
import { VILLAS } from '../data';

interface AvailabilityFormProps {
  initialRoomId?: string;
  onSuccess?: () => void;
}

export default function AvailabilityForm({ initialRoomId, onSuccess }: AvailabilityFormProps) {
  // Booking Fields
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedRoomId, setSelectedRoomId] = useState(initialRoomId || 'lakefront-pool-villa');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [specialRequests, setSpecialRequests] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);

  // App States
  const [inquiriesList, setInquiriesList] = useState<Inquiry[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [errorFeedback, setErrorFeedback] = useState('');
  const [viewHistory, setViewHistory] = useState(false);

  // Load past inquiries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('twl_inquiries');
    if (saved) {
      try {
        setInquiriesList(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local inquiries:", e);
      }
    }
  }, []);

  // Sync state if initialRoomId changes externally
  useEffect(() => {
    if (initialRoomId) {
      setSelectedRoomId(initialRoomId);
    }
  }, [initialRoomId]);

  const selectedVilla = VILLAS.find(v => v.id === selectedRoomId) || VILLAS[0];

  // Price calculations
  const getNightsCount = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nights = getNightsCount();
  const roomBaseTotal = nights * selectedVilla.rate;
  const activityCost = activities.length * 150; // flat rate for premium excursions per reservation
  const conservationLevy = roomBaseTotal > 0 ? Math.round(roomBaseTotal * 0.05) : 0; // 5% conservation fee
  const estimatedTotal = roomBaseTotal + activityCost + conservationLevy;

  const handleSpecialRequestToggle = (req: string) => {
    if (specialRequests.includes(req)) {
      setSpecialRequests(specialRequests.filter(item => item !== req));
    } else {
      setSpecialRequests([...specialRequests, req]);
    }
  };

  const handleActivityToggle = (act: string) => {
    if (activities.includes(act)) {
      setActivities(activities.filter(item => item !== act));
    } else {
      setActivities([...activities, act]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorFeedback('');

    if (!checkIn || !checkOut) {
      setErrorFeedback('Please select both Check-in and Check-out dates.');
      return;
    }
    if (nights <= 0) {
      setErrorFeedback('Check-out date must occur after the Check-in date.');
      return;
    }
    if (!name.trim()) {
      setErrorFeedback('Please provide your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorFeedback('Please provide a valid email address.');
      return;
    }

    const newId = 'TWL-' + Math.floor(1000 + Math.random() * 9000);
    const newInquiry: Inquiry = {
      id: newId,
      checkIn,
      checkOut,
      guests,
      roomType: selectedVilla.name,
      name,
      email,
      phone,
      notes,
      specialRequests,
      activities,
      dateCreated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'pending',
      totalPrice: estimatedTotal
    };

    const updatedList = [newInquiry, ...inquiriesList];
    setInquiriesList(updatedList);
    localStorage.setItem('twl_inquiries', JSON.stringify(updatedList));

    setSubmissionId(newId);
    setIsSubmitted(true);
    if (onSuccess) {
      onSuccess();
    }
  };

  const clearForm = () => {
    setCheckIn('');
    setCheckOut('');
    setGuests(2);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setSpecialRequests([]);
    setActivities([]);
    setIsSubmitted(false);
  };

  const handleCancelInquiry = (id: string) => {
    const updated = inquiriesList.map(inq => {
      if (inq.id === id) {
        return { ...inq, status: 'cancelled' as const };
      }
      return inq;
    });
    setInquiriesList(updated);
    localStorage.setItem('twl_inquiries', JSON.stringify(updated));
  };

  const handleDeleteInquiryRecord = (id: string) => {
    const updated = inquiriesList.filter(inq => inq.id !== id);
    setInquiriesList(updated);
    localStorage.setItem('twl_inquiries', JSON.stringify(updated));
  };

  return (
    <div className="bg-white border border-earth-100 rounded-xl shadow-sm overflow-hidden" id="booking-widget">
      {/* Header Tabs */}
      <div className="flex border-b border-earth-100 bg-earth-50">
        <button
          onClick={() => setViewHistory(false)}
          className={`flex-1 py-4 text-center text-sm tracking-wider font-light uppercase transition-colors ${
            !viewHistory 
              ? 'bg-white border-t-2 border-earth-600 text-earth-800 font-normal outline-none' 
              : 'text-earth-600 hover:text-earth-900'
          }`}
          id="tab-new-booking"
        >
          Enquire Now
        </button>
        <button
          onClick={() => setViewHistory(true)}
          className={`flex-1 py-4 text-center text-sm tracking-wider font-light uppercase transition-colors relative ${
            viewHistory 
              ? 'bg-white border-t-2 border-earth-600 text-earth-800 font-normal outline-none' 
              : 'text-earth-600 hover:text-earth-900'
          }`}
          id="tab-booking-history"
        >
          My Requests
          {inquiriesList.length > 0 && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-earth-600 text-white font-sans text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {inquiriesList.length}
            </span>
          )}
        </button>
      </div>

      <div className="p-6 md:p-8">
        {!viewHistory ? (
          /* Submission Screen */
          isSubmitted ? (
            <div className="text-center py-8" id="submission-success">
              <div className="w-16 h-16 bg-earth-100 text-earth-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-serif text-2xl text-charcoal-900 mb-2">Submission Received</h3>
              <p className="text-sm text-earth-700 mb-6 font-light max-w-md mx-auto">
                Thank you, <span className="font-medium text-charcoal-900">{name}</span>. Your enquiry code <span className="font-mono bg-earth-100 px-2 py-0.5 rounded text-earth-900">{submissionId}</span> has been dispatched to our Malawian reservations team.
              </p>

              {/* Summary Bill Paper */}
              <div className="bg-earth-50 rounded-lg p-6 text-left border border-earth-100 max-w-md mx-auto mb-8 font-light text-sm">
                <div className="flex justify-between border-b border-earth-200 pb-3 mb-3">
                  <span className="font-medium text-charcoal-900">Enquiry Invoice</span>
                  <span className="font-mono text-xs">{submissionId}</span>
                </div>
                <div className="space-y-2 text-earth-800">
                  <div className="flex justify-between">
                    <span>Sanctuary Villa:</span>
                    <span className="text-charcoal-900">{selectedVilla.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stay length:</span>
                    <span>{nights} Nights ({checkIn} to {checkOut})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Traveler Count:</span>
                    <span>{guests} Guests</span>
                  </div>
                  {activities.length > 0 && (
                    <div className="flex justify-between">
                      <span>Excursions Added:</span>
                      <span>{activities.length} Custom outings (+${activities.length * 150})</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-earth-200 pt-3 mt-3">
                    <span>Villa Base Total ({nights} nights):</span>
                    <span>${roomBaseTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Eco-Levy &amp; Forest Protection (5%):</span>
                    <span>${conservationLevy}</span>
                  </div>
                  <div className="flex justify-between border-t border-earth-300 pt-3 mt-3 text-base text-charcoal-900 font-semibold">
                    <span>Estimated Total (USD):</span>
                    <span className="text-earth-700">${estimatedTotal}</span>
                  </div>
                </div>
                <div className="mt-4 text-center text-xs text-earth-600">
                  A personal reservations host will write or dial you within 12 hours.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  onClick={clearForm}
                  className="px-6 py-3 border border-earth-600 text-earth-800 rounded-md text-sm tracking-wider uppercase font-light hover:bg-earth-100 transition-colors"
                  id="btn-enquire-again"
                >
                  New Booking
                </button>
                <button
                  type="button"
                  onClick={() => setViewHistory(true)}
                  className="px-6 py-3 bg-earth-800 text-white rounded-md text-sm tracking-wider uppercase font-light hover:bg-earth-950 transition-colors"
                  id="btn-view-requests"
                >
                  Review Requests
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6" id="booking-form">
              {errorFeedback && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs flex items-center gap-2 rounded shadow-sm" id="form-error">
                  <ShieldAlert size={16} />
                  <span>{errorFeedback}</span>
                </div>
              )}

              {/* Dates Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-earth-800 font-medium mb-2">Check-In</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-earth-50 border border-earth-200 rounded px-4 py-3 text-sm focus:border-earth-600 focus:outline-none focus:bg-white text-earth-900"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-earth-800 font-medium mb-2">Check-Out</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-earth-50 border border-earth-200 rounded px-4 py-3 text-sm focus:border-earth-600 focus:outline-none focus:bg-white text-earth-900"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Room and Guests Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-earth-800 font-medium mb-2">Accommodation Type</label>
                  <select
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                    className="w-full bg-earth-50 border border-earth-200 rounded px-4 py-3 text-sm focus:border-earth-600 focus:outline-none focus:bg-white text-earth-900"
                  >
                    {VILLAS.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} (from ${v.rate}/n)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-earth-800 font-medium mb-2">Total Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full bg-earth-50 border border-earth-200 rounded px-4 py-3 text-sm focus:border-earth-600 focus:outline-none focus:bg-white text-earth-900"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} Guest{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Multi-Select Experience addons */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-earth-800 font-medium mb-2">
                  Excursion Intentions <span className="text-[10px] text-earth-600 normal-case">(Add-ons calculated in quote, $150 each)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="excursion-checklist">
                  {[
                    { id: 'reserve-safari', label: 'Nkhotakota Reserve Sunset Safari' },
                    { id: 'lake-sailing', label: 'Sunset Mvula Dhow Sailing' },
                    { id: 'clay-pottery', label: 'Community Pottery Studio' },
                    { id: 'spa-therapy', label: '90-Min Sensory Marula Massage' }
                  ].map((x) => (
                    <label
                      key={x.id}
                      className={`flex items-start gap-3 p-3 border rounded cursor-pointer transition-all ${
                        activities.includes(x.label)
                          ? 'bg-earth-100/50 border-earth-600'
                          : 'border-earth-200/60 hover:border-earth-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={activities.includes(x.label)}
                        onChange={() => handleActivityToggle(x.label)}
                        className="mt-1 accent-earth-700"
                      />
                      <span className="text-xs text-charcoal-900 leading-tight">{x.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-earth-800 font-medium mb-3">Contact Information</label>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name(s)"
                    className="w-full bg-earth-50 border border-earth-200 rounded px-4 py-3 text-sm focus:border-earth-600 focus:outline-none focus:bg-white text-earth-900"
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full bg-earth-50 border border-earth-200 rounded px-4 py-3 text-sm focus:border-earth-600 focus:outline-none focus:bg-white text-earth-900"
                      required
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone (incl. Dial Code)"
                      className="w-full bg-earth-50 border border-earth-200 rounded px-4 py-3 text-sm focus:border-earth-600 focus:outline-none focus:bg-white text-earth-900"
                    />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-earth-800 font-medium mb-2">Special Requests &amp; Dietary Guidelines</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share details of your travel vision, dietary requests, allergies, accessibility needs, or flight routing arrangements."
                  rows={3}
                  className="w-full bg-earth-50 border border-earth-200 rounded px-4 py-3 text-sm focus:border-earth-600 focus:outline-none focus:bg-white text-earth-900 placeholder-earth-600/70 font-light"
                />
              </div>

              {/* Live Calculator Sheet */}
              {nights > 0 && (
                <div className="p-4 bg-earth-50 rounded-lg border border-earth-200/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left transition-all">
                  <div className="font-light text-xs text-earth-800">
                    <span className="font-semibold text-charcoal-900">{selectedVilla.name}</span> &times; {nights} nights ({guests} travelers)<br />
                    Levy: <span className="font-mono">${conservationLevy}</span> (eco &amp; school contributions)
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase text-earth-600 tracking-wider">Estimated Outlay</div>
                    <div className="text-2xl font-serif text-earth-800 leading-none">${estimatedTotal}</div>
                    <div className="text-[10px] text-earth-600">includes 16.5% Malawi VAT</div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-earth-800 hover:bg-earth-900 text-white py-4 rounded font-light text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                id="btn-submit-booking"
              >
                <Send size={15} />
                Submit Direct Enquiry
              </button>
            </form>
          )
        ) : (
          /* Past Inquiries Dashboard list */
          <div className="space-y-6" id="history-container">
            <h3 className="font-serif text-xl text-charcoal-900 mb-2 border-b border-earth-100 pb-2">Stored Enquiries</h3>
            <p className="text-xs text-earth-700 font-light">
              We store your active enquiry states safely inside your browser session for direct management. Feel free to revise or cancel any request.
            </p>

            {inquiriesList.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-earth-200 rounded-lg bg-earth-50">
                <Calendar className="text-earth-300 mx-auto mb-4" size={32} />
                <p className="text-sm text-earth-600 font-light">No inquiry files currently found.</p>
                <button
                  onClick={() => setViewHistory(false)}
                  className="mt-4 px-4 py-2 text-xs bg-earth-700 hover:bg-earth-800 text-white rounded uppercase tracking-wider font-light"
                >
                  Create Enquiry
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiriesList.map((inq) => (
                  <div
                    key={inq.id}
                    className={`border rounded-lg p-5 font-light text-xs ${
                      inq.status === 'cancelled' ? 'bg-zinc-50 border-zinc-200 opacity-60' : 'bg-white border-earth-100 shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-center border-b border-earth-100 pb-2 mb-3">
                      <div>
                        <span className="font-mono text-charcoal-900 bg-earth-100 px-1.5 py-0.5 rounded text-[11px] font-bold mr-2">
                          {inq.id}
                        </span>
                        <span className="text-[10px] text-earth-600">{inq.dateCreated}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium ${
                          inq.status === 'pending'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-zinc-200 text-zinc-600 border border-zinc-300'
                        }`}
                      >
                        {inq.status === 'pending' ? 'Pending Review' : 'Cancelled'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-earth-800 mb-3">
                      <div>
                        <div className="mb-1">
                          <strong className="text-charcoal-900">Villa Type:</strong> {inq.roomType}
                        </div>
                        <div className="mb-1">
                          <strong className="text-charcoal-900">Dates:</strong> {inq.checkIn} to {inq.checkOut}
                        </div>
                        <div className="mb-1">
                          <strong className="text-charcoal-900">Travelers:</strong> {inq.guests} Guest{inq.guests > 1 ? 's' : ''}
                        </div>
                      </div>
                      <div>
                        <div className="mb-1">
                          <strong className="text-charcoal-900">Lead guest:</strong> {inq.name}
                        </div>
                        <div className="mb-1">
                          <strong className="text-charcoal-900">Email:</strong> {inq.email}
                        </div>
                        <div className="mb-1">
                          <strong className="text-charcoal-900">Est. Total:</strong> <span className="font-semibold text-earth-800 font-mono">${inq.totalPrice}</span>
                        </div>
                      </div>
                    </div>

                    {inq.activities.length > 0 && (
                      <div className="mb-3 bg-earth-50 p-2 rounded border border-earth-100">
                        <strong className="text-charcoal-900">Planned excursions:</strong>{' '}
                        {inq.activities.join(', ')}
                      </div>
                    )}

                    {inq.notes && (
                      <div className="mb-3 text-earth-700 italic border-l-2 border-earth-200 pl-2">
                        &ldquo;{inq.notes}&rdquo;
                      </div>
                    )}

                    <div className="flex gap-2 justify-end border-t border-earth-100 pt-3">
                      {inq.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => handleCancelInquiry(inq.id)}
                          className="px-2.5 py-1 border border-zinc-300 rounded text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer flex items-center gap-1"
                          title="Withdraw request"
                        >
                          Cancel Request
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteInquiryRecord(inq.id)}
                        className="px-2.5 py-1 border border-red-200 rounded text-red-600 hover:bg-red-50 transition-colors cursor-pointer flex items-center gap-1"
                        title="Delete record from browser dashboard"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
