using System;
using System.Drawing;
using System.Windows.Forms;
using System.Diagnostics;

namespace Life
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            //DoubleBuffered = true;
            InitializeComponent();
            int len = 16;
            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    var btn = new Button
                    {
                        Name = x + "_" + y,
                        Location = new Point(x * len, y * len),
                        Size = new Size(len, len),
                        FlatStyle = FlatStyle.Flat
                    };
                    btn.Click += new System.EventHandler(this.Btn_Click);
                    list[x, y] = btn;
                }
            }

            SuspendLayout();
            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    Controls.Add(list[x, y]);
                }
            }
            ResumeLayout();
            ButtonNew_Click(null, null);
        }


        // New:
        private void ButtonNew_Click(object sender, EventArgs e)
        {
            Stop();
            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    a[x, y] = 0;
                }
            }
            for (int i = 0; i < (w * h / 3); i++)
            {
                var x = rand.Next(0, w);
                var y = rand.Next(0, h);
                a[x, y] = 1;
                //list[x, y].BackColor = Color.Green;
            }
            if (sender != null) { ButtonStart_Click(null, null); }
        }

        // toggle a Cell.
        private void Btn_Click(object sender, EventArgs e)
        {
            var btn = sender as Button;
            var s = btn.Name;
            var i = s.IndexOf('_');
            if (i == -1) { return; }
            if (!int.TryParse(s.Substring(0, i), out int x)) { return; }
            if (!int.TryParse(s.Substring(i + 1), out int y)) { return; }
            a[x, y] ^= 1;
            list[x, y].BackColor = a[x, y] == 1 ? on : off;

        }

        const int w = 32; // x
        const int h = 32; // y
        readonly Button[,] list = new Button[w, h];
        readonly byte[,] a = new byte[w, h];
        readonly byte[,] b = new byte[w, h];
        readonly Random rand = new Random();
        readonly Stopwatch sw = new Stopwatch();
        readonly Color on = Color.Green;
        readonly Color off = SystemColors.Control;


        private void ButtonApply_Click(object sender, EventArgs e)
        {
            if (int.TryParse(textBox1.Text, out int ms))
            {
                if (ms == 0) { ms = 1; }
                timer1.Interval = ms;
                textBox1.Text = FormattableString.Invariant($"{ms}");
            }
        }

        private void ButtonStart_Click(object sender, EventArgs e)
        {
            if (buttonStart.Text == "&Start")
            {
                Start();
            }
            else
            {
                Stop();
            }
        }
        void Stop()
        {
            timer1.Enabled = false;
            sw.Stop();
            buttonStart.Text = "&Start";
            Text += " Stopped";
        }
        void Start()
        {
            timer1.Enabled = true;
            sw.Start();
            buttonStart.Text = "&Stop";
        }
        byte PredictNextState(int x, int y)
        {
            var v = a[x, y];
            var count = -v;
            for (int i = -1; i <= 1; i++)
            {
                for (int j = -1; j <= 1; j++)
                {
                    var xi = x + i;
                    var yj = y + j;
                    if (xi < 0 || xi >= w || yj < 0 || yj >= h)
                    {
                        continue;
                    }
                    count += a[xi, yj];
                }
            }
            if (count == 3 || (count == 2 && v == 1))
            {
                return 1;
            }
            return 0;
        }

        private void Timer1_Tick(object sender, EventArgs e)
        {
            sw.Stop();
            Text ="interval = "+ sw.Elapsed.Milliseconds + "ms";
            sw.Restart();

            // predictNextState:
            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    b[x, y] = PredictNextState(x, y);
                }
            }
            var done = true;
            // Show state:
            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    var v = b[x, y]; // new
                    if (a[x, y] != v)  // only toggle changed states:
                    {
                        list[x, y].BackColor = v == 1 ? on : off;
                        a[x, y] = v;
                        done = false;
                    }
                }
            }
            if (done)
            {
                Stop();
            }
        }

    }
}
