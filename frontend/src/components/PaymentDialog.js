import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  Payment as PayPalIcon
} from '@mui/icons-material';

const paymentMethods = [
  { 
    id: 'paypal', 
    name: 'PayPal', 
    icon: <PayPalIcon sx={{ mr: 1 }} />,
    description: 'Pay with your PayPal account'
  },
  // ... rest of the file remains the same ...
