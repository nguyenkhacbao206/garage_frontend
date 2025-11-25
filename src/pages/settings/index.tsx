import React from "react";
import "./assets/setting.scss";

const user = {
  name: "Nguyen Minh",
  phone: "(+84) 912 345 678",
  email: "nguyen.minh@example.com",
  dateOfBirth: "15-08-1995",
  gender: "Male",
  city: "Ha Noi",
  country: "thái bình",
  address: "123 Duong Lang, Dong Da District, Ha Noi",
  avatar: "https://i.pravatar.cc/150?img=32",
  createdAt: "2025-01-10T08:30:00Z",
  updatedAt: "2025-11-20T15:45:00Z",
  description: "Nguyen Minh is passionate about technology, loves programming, and participates in open-source projects."
};


const Profile = () => {
  return (
    <div className="profile-page">
      <div className="profile-header card">
        <div className="avatar-wrapper">
          <img src={user.avatar} alt="Avatar" className="avatar" />
        </div>
        <div className="basic-info">
          <h2>{user.name}</h2>
          <p>Quản lý</p>
          <p>{user.city}</p>
        </div>
      </div>

      <div className="profile-card card">
        <div className="card-header">
          <h3>Personal Information</h3>
          <button className="btn-edit">Edit </button>
        </div>
        <div className="card-body info-grid">
          <div>
            <span>Họ và tên</span>
            <p>{user.name}</p>
          </div>
          <div>
            <span>Ngày sinh</span>
            <p>{user.dateOfBirth}</p>
          </div>
          <div>
            <span>Email</span>
            <p>{user.email}</p>
          </div>
          <div>
            <span>Số điện thoại</span>
            <p>{user.phone}</p>
          </div>
        </div>
      </div>

      <div className="profile-card card">
        <div className="card-header">
          <h3>Address</h3>
          <button className="btn-edit">Edit </button>
        </div>
        <div className="card-body info-grid">
          <div>
            <span>Quê quán</span>
            <p>{user.country}</p>
          </div>
          <div>
            <span>City</span>
            <p>{user.city}</p>
          </div>
          <div>
            <span>Postal Code</span>
            <p>{user.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
