double vin(double r1, double r2, double vout)  {
    return vout * (r1 + r2) / r2;
}


double vout(double r1, double r2, double vin)  {
    return vin * r2 / (r1 + r2);
}


double r1(double r2, double vin, double vout)  {
    return r2 * (vin - vout) / vout;
}


double r2(double r1, double vin, double vout)  {
    return r1 * vout / (vin - vout);
}


double p_r1(double r1, double vin, double vout)  {
    double v = vin - vout;
    return v * v / r1;
}


double p_r2(double r2, double vout)  {
    return vout * vout / r2;
}


double i_r1(double r1, double vin, double vout)  {
    return (vin - vout) / r1;
}


double rth(double r1, double r2)  {
    return r1 * r2 / (r1 + r2);
}
