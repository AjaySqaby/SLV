"use client";
import { useState } from "react";
import { Bell, Edit, Inbox, Search, Clock, User, MapPin, Car, Building, Briefcase, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import MessageTypeCard from "@/components/ui/MessageTypeCard";
import PageLayout from "@/components/layout/page-layout";
import { MESSAGE_TYPES, RECIPIENT_GROUPS } from "@/constants/notification";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("compose");
  const [selectedMessageType, setSelectedMessageType] = useState(null);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [massNotification, setMassNotification] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Sample notification data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "routedelay",
      title: "Route Delay",
      message: "Route RT-30842 is delayed by 15 minutes due to traffic.",
      timestamp: "4/3/2025, 2:30:00 PM",
      isRead: false,
      priority: "high"
    },
    {
      id: 2,
      type: "newdriverassigned",
      title: "New Driver Assigned",
      message: "Michael Johnson has been assigned to route RT-30843.",
      timestamp: "4/3/2025, 10:15:00 AM",
      isRead: false,
      priority: "medium"
    },
    {
      id: 3,
      type: "routecompleted",
      title: "Route Completed",
      message: "Route RT-30841 has been completed successfully.",
      timestamp: "4/2/2025, 4:45:00 PM",
      isRead: true,
      priority: "low"
    }
  ]);

  // Sample recipients data
  const recipients = [
    { id: "john-smith", name: "John Smith", type: "driver", route: "RT-30842", avatar: null },
    { id: "emily-johnson", name: "Emily Johnson", type: "driver", route: "RT-30843", avatar: null },
    { id: "marcus-williams", name: "Marcus Williams", type: "driver", route: "RT-30844", avatar: null },
    { id: "sarah-parker", name: "Sarah Parker", type: "parent", student: "Jamie Parker", avatar: null },
    { id: "david-brown", name: "David Brown", type: "parent", student: "Alex Brown", avatar: null },
    { id: "lisa-rodriguez", name: "Lisa Rodriguez", type: "parent", student: "Maya Rodriguez", avatar: null },
    { id: "cross-keys-hs", name: "Cross Keys High School", type: "campus", students: "450", avatar: null },
    { id: "chamblee-hs", name: "Chamblee High School", type: "campus", students: "320", avatar: null },
    { id: "dunwoody-hs", name: "Dunwoody High School", type: "campus", students: "380", avatar: null },
    { id: "first-student", name: "First Student", type: "vendor", drivers: "12", avatar: null },
    { id: "saferide-transport", name: "SafeRide Transport", type: "vendor", drivers: "8", avatar: null },
    { id: "abc-transport", name: "ABC Transport Services", type: "vendor", drivers: "15", avatar: null },
    { id: "dekalb-county", name: "DeKalb County Schools", type: "district", campuses: "24", students: "1200", avatar: null },
    { id: "fulton-county", name: "Fulton County Schools", type: "district", campuses: "18", students: "950", avatar: null },
  ];

  const filteredRecipients = recipients.filter(recipient => {
    // First filter by search term
    const matchesSearch = recipient.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // If mass notification is enabled, filter by selected categories
    if (massNotification) {
      if (selectedCategories.length === 0) return false; // No categories selected
      
      const matchesCategory = 
        (selectedCategories.includes('drivers') && recipient.type === 'driver') ||
        (selectedCategories.includes('districts') && recipient.type === 'district') ||
        (selectedCategories.includes('campuses') && recipient.type === 'campus') ||
        (selectedCategories.includes('vendors') && recipient.type === 'vendor');
      
      return matchesSearch && matchesCategory;
    }
    
    return matchesSearch;
  });

  const handleRecipientToggle = (recipientId) => {
    setSelectedRecipients(prev =>
      prev.includes(recipientId)
        ? prev.filter(id => id !== recipientId)
        : [...prev, recipientId]
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getMassNotificationRecipients = () => {
    if (!massNotification) return [];
    
    let massRecipients = [];
    
    if (selectedCategories.includes('drivers')) {
      massRecipients = massRecipients.concat(recipients.filter(r => r.type === 'driver'));
    }
    if (selectedCategories.includes('districts')) {
      massRecipients = massRecipients.concat(recipients.filter(r => r.type === 'district'));
    }
    if (selectedCategories.includes('campuses')) {
      massRecipients = massRecipients.concat(recipients.filter(r => r.type === 'campus'));
    }
    if (selectedCategories.includes('vendors')) {
      massRecipients = massRecipients.concat(recipients.filter(r => r.type === 'vendor'));
    }
    
    // Remove duplicates
    return [...new Set(massRecipients)];
  };

  const getTotalRecipients = () => {
    if (massNotification) {
      return getMassNotificationRecipients().length;
    }
    return selectedRecipients.length;
  };

  const getRecipientIcon = (type) => {
    switch (type) {
      case 'driver': return <Car className="w-4 h-4" />;
      case 'parent': return <User className="w-4 h-4" />;
      case 'campus': return <Building className="w-4 h-4" />;
      case 'vendor': return <Briefcase className="w-4 h-4" />;
      case 'district': return <Building className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'routedelay': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'newdriverassigned': return <Car className="w-5 h-5 text-blue-500" />;
      case 'routecompleted': return <MapPin className="w-5 h-5 text-green-500" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'routedelay': return 'border-l-orange-500';
      case 'newdriverassigned': return 'border-l-blue-500';
      case 'routecompleted': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <PageLayout activePage="Notifications" pageTitle="Notifications">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[var(--primary-bg)] rounded-lg">
            <Bell className="w-6 h-6 text-[var(--primary)]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--heading)]">Notifications</h1>
            <p className="text-lg text-[var(--muted-text)] mt-1">
              Manage and send notifications to drivers, parents, and campuses
            </p>
          </div>
        </div>

        {/* Tabs - matching the button design from image */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab("compose")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === "compose"
                ? "bg-[var(--blue)] text-white shadow-sm"
                : "bg-white text-[var(--heading)] border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Edit className="w-4 h-4" />
            Compose
          </button>
          <button
            onClick={() => setActiveTab("inbox")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === "inbox"
                ? "bg-[var(--blue)] text-white shadow-sm"
                : "bg-white text-[var(--heading)] border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Inbox className="w-4 h-4" />
            Inbox
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
        {activeTab === "compose" ? (
          <div className="p-6 h-full">
            {/* Message Type Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--heading)] mb-4">Message Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {MESSAGE_TYPES.map((messageType, index) => (
                  <MessageTypeCard
                    key={messageType.id}
                    logo={messageType.logo}
                    label={messageType.label}
                    index={index}
                    selected={selectedMessageType === messageType.id}
                    onClick={() => setSelectedMessageType(messageType.id)}
                  />
                ))}
              </div>
            </div>

            {/* Recipients Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--heading)] mb-4">Recipients</h2>
              
              {/* Notification Type Toggle */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMassNotification(true);
                      setSelectedRecipients([]);
                      setSearchTerm("");
                    }}
                    className={`relative w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                      massNotification
                        ? "bg-[var(--blue-600)] border-[var(--blue-600)]"
                        : "bg-white border-[var(--gray-300)] hover:border-[var(--blue-400)]"
                    }`}
                  >
                    {massNotification && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </button>
                  <span className="text-sm font-medium text-[var(--heading)]">Mass notification</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMassNotification(false);
                      setSelectedCategories([]);
                    }}
                    className={`relative w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                      !massNotification
                        ? "bg-[var(--blue-600)] border-[var(--blue-600)]"
                        : "bg-white border-[var(--gray-300)] hover:border-[var(--blue-400)]"
                    }`}
                  >
                    {!massNotification && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </button>
                  <span className="text-sm font-medium text-[var(--heading)]">Select individual recipients</span>
                </div>
              </div>

              {/* Mass Notification Categories */}
              {massNotification && (
                <div className="mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleCategoryToggle('drivers')}
                        className={`relative w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                          selectedCategories.includes('drivers')
                            ? "bg-[var(--blue-600)] border-[var(--blue-600)]"
                            : "bg-white border-[var(--gray-300)] hover:border-[var(--blue-400)]"
                        }`}
                      >
                        {selectedCategories.includes('drivers') && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </button>
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        <span className="text-sm font-medium text-[var(--heading)]">All Drivers</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleCategoryToggle('districts')}
                        className={`relative w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                          selectedCategories.includes('districts')
                            ? "bg-[var(--blue-600)] border-[var(--blue-600)]"
                            : "bg-white border-[var(--gray-300)] hover:border-[var(--blue-400)]"
                        }`}
                      >
                        {selectedCategories.includes('districts') && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </button>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span className="text-sm font-medium text-[var(--heading)]">Districts</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleCategoryToggle('campuses')}
                        className={`relative w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                          selectedCategories.includes('campuses')
                            ? "bg-[var(--blue-600)] border-[var(--blue-600)]"
                            : "bg-white border-[var(--gray-300)] hover:border-[var(--blue-400)]"
                        }`}
                      >
                        {selectedCategories.includes('campuses') && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </button>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span className="text-sm font-medium text-[var(--heading)]">Campuses</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleCategoryToggle('vendors')}
                        className={`relative w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                          selectedCategories.includes('vendors')
                            ? "bg-[var(--blue-600)] border-[var(--blue-600)]"
                            : "bg-white border-[var(--gray-300)] hover:border-[var(--blue-400)]"
                        }`}
                      >
                        {selectedCategories.includes('vendors') && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </button>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-sm font-medium text-[var(--heading)]">Vendors</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Search Recipients - Only show when not in mass notification mode */}
              {!massNotification && (
                <div className="mb-4">
                  <Input
                    icon={<Search className="w-4 h-4 text-gray-400" />}
                    placeholder="Search recipients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-10"
                  />
                </div>
              )}

              {/* Recipients Grid */}
              {filteredRecipients.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRecipients.map((recipient) => (
                    <Card key={recipient.id} className="p-4 border border-gray-200">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => !massNotification && handleRecipientToggle(recipient.id)}
                          disabled={massNotification}
                          className={`relative w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                            (selectedRecipients.includes(recipient.id) || massNotification)
                              ? "bg-[var(--blue-600)] border-[var(--blue-600)]"
                              : "bg-white border-[var(--gray-300)] hover:border-[var(--blue-400)]"
                          } ${massNotification ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          {(selectedRecipients.includes(recipient.id) || massNotification) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </button>
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {getRecipientIcon(recipient.type)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-[var(--heading)] text-sm">
                              {recipient.name}
                            </div>
                            <div className="text-xs text-[var(--muted-text)]">
                              {recipient.type === 'driver' && `Route ${recipient.route}`}
                              {recipient.type === 'parent' && `Student: ${recipient.student}`}
                              {recipient.type === 'campus' && `Parents of ${recipient.students} students`}
                              {recipient.type === 'vendor' && `${recipient.drivers} drivers`}
                              {recipient.type === 'district' && `${recipient.campuses} campuses, ${recipient.students} students`}
                            </div>
                            <div className="text-xs text-[var(--muted-text)] capitalize flex items-center gap-1">
                              {getRecipientIcon(recipient.type)}
                              {recipient.type}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[var(--muted-text)]">
                    {massNotification && selectedCategories.length === 0 
                      ? "Please select at least one category above to see recipients"
                      : "No recipients found"}
                  </p>
                </div>
              )}
            </div>

            {/* Preview Section */}
            {(selectedMessageType && (getTotalRecipients() > 0 || (massNotification && selectedCategories.length > 0))) && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-[var(--heading)] mb-4">Preview</h2>
                <Card className="p-4 bg-blue-50 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--heading)] mb-2">
                        {MESSAGE_TYPES.find(type => type.id === selectedMessageType)?.label}
                      </h3>
                      <p className="text-sm text-gray-700 mb-3">
                        A new driver has been assigned to your route.
                      </p>
                      <p className="text-sm text-blue-700">
                        To: {massNotification ? `${getTotalRecipients()} recipients` : 
                             selectedRecipients.map(id => recipients.find(r => r.id === id)?.name).join(', ')}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Send Button */}
            <div className="flex justify-end">
              <Button
                variant="primary"
                size="lg"
                disabled={!selectedMessageType || (!massNotification && selectedRecipients.length === 0) || (massNotification && selectedCategories.length === 0)}
                className="px-8 bg-purple-500 hover:bg-purple-600"
              >
                Send Notification
              </Button>
            </div>
          </div>
        ) : (
          // Inbox Tab
          <div className="p-6">
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative border-l-4 transition-colors ${getNotificationColor(notification.type)} ${
                    !notification.isRead 
                      ? 'bg-white' 
                      : 'bg-white'
                  }`}
                >
                  {/* Status indicator triangle for unread */}
                  {!notification.isRead && (
                    <div className="absolute top-4 left-0">
                      <div className={`w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px] border-t-transparent border-b-transparent ${
                        notification.type === 'routedelay' ? 'border-r-orange-500' :
                        notification.type === 'newdriverassigned' ? 'border-r-blue-500' :
                        notification.type === 'routecompleted' ? 'border-r-green-500' :
                        'border-r-gray-500'
                      }`}></div>
                    </div>
                  )}
                  
                  <div className="p-4 pl-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-[var(--heading)]">
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded font-medium">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.isRead && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {notifications.length === 0 && (
                <div className="text-center py-12">
                  <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Inbox className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-[var(--heading)] mb-2">
                    No notifications
                  </h3>
                  <p className="text-[var(--muted-text)]">
                    You're all caught up! No new notifications at the moment.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
