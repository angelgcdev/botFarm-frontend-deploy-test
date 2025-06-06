// Estados de datos
const [userData, setUserData] = useState(null);
const [users, setUsers] = useState([]);

// Estados de UI
const [isLoading, setIsLoading] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const [hasError, setHasError] = useState(false);

// Estados de formulario
const [emailValue, setEmailValue] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);

// Estados de selección
const [selectedUser, setSelectedUser] = useState(null);
const [selectedItems, setSelectedItems] = useState([]);

// Estados de tiempo/contadores
const [estimatedTime, setEstimatedTime] = useState(0);
const [itemCount, setItemCount] = useState(0);