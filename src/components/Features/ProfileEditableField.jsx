import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";

// Editable field component with save/cancel functionality for profile editing
const ProfileEditableField = ({ 
  label, 
  value, 
  type = "text", 
  onSave, 
  onCancel,
  isLoading = false,
  className = ""
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = async () => {
    const result = await onSave(editValue);
    if (result?.success !== false) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
    onCancel?.();
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  if (isEditing) {
    return (
      <div className={`space-y-4 ${className}`}>
        <Input
          type={type}
          label={label}
          value={editValue}
          onChange={handleEditChange}
          required
        />
        <div className="flex space-x-3">
          <Button
            onClick={handleSave}
            loading={isLoading}
            disabled={isLoading}
            variant="primary"
            className="flex-1"
          >
            Save Changes
          </Button>
          <Button
            onClick={handleCancel}
            variant="secondary"
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <p className="text-gray-900">{value}</p>
      </div>
      <Button
        onClick={() => setIsEditing(true)}
        variant="primary"
      >
        Edit Profile
      </Button>
    </div>
  );
};

export default ProfileEditableField;
