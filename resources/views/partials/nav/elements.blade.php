<li class="menu-header">{{__('Personnes')}}</li>
<li class="nav-item dropdown {{(Request::is('customers*')? 'active' : '')}}">
    <a href="#" class="nav-link has-dropdown" data-toggle="dropdown">
        <i class="fas fa-users"></i>
        <span>{{__('Clients')}}</span></a>
    <ul class="dropdown-menu">
        <li class="{{(Request::is('customers')? 'active' : '')}}">
            <a class="nav-link " href="{{route('customers.index')}}">
                <i class="fas fa-user-friends"></i>
                Liste des clients
            </a>
        </li>
        <li>
            <a class="nav-link" href="#" data-toggle="modal" data-target="#customerModal">
                <i class="fas fa-user-plus"></i>
                Ajouter un client
            </a>
        </li>
    </ul>
</li>
<li class="menu-header">Pages</li>
<li class="nav-item dropdown">
    <a href="#" class="nav-link has-dropdown"><i class="far fa-user"></i> <span>Auth</span></a>
    <ul class="dropdown-menu">
        <li><a href="auth-forgot-password.html">Forgot Password</a></li>
        <li><a href="auth-login.html">Login</a></li>
        <li><a class="beep beep-sidebar" href="auth-login-2.html">Login 2</a></li>
        <li><a href="auth-register.html">Register</a></li>
        <li><a href="auth-reset-password.html">Reset Password</a></li>
    </ul>
</li>